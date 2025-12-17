/**
 * Custom Dynamic Family Tree Renderer
 * Features:
 * - Hierarchical layout using CSS Flexbox
 * - Visual distinction: Male (Rectangle), Female (Circle avatar)
 * - Click to Focus: Renders subtree from the oldest ancestor of the clicked person
 * - Zoom & Pan support
 */

let zoomLevel = 1;
let panX = 0;
let panY = 0;
let isDragging = false;
let startX, startY;

// --- Data Helpers ---

function findNode ( id ) {
    return familyData.find( n => n.id === id );
}

function findSpouses ( node ) {
    if ( !node.pids || node.pids.length === 0 ) return [];
    return node.pids.map( pid => findNode( pid ) ).filter( n => n !== undefined );
}

function findChildrenForCouple ( parentId1, parentId2 ) {
    // Child belongs if it lists these parents
    return familyData.filter( n => {
        const parents = [ n.mid, n.fid ];
        // If both parents known, match both
        if ( parentId1 && parentId2 ) {
            return parents.includes( parentId1 ) && parents.includes( parentId2 );
        }
        // If only one is the biological parent in data?
        // Our data structure: mid=MotherID, fid=FatherID.
        // We are rendering a specific Couple (Mom & Dad).
        // So a child must have mid == mom.id AND fid == dad.id.
        return ( n.mid === parentId1 && n.fid === parentId2 ) || ( n.mid === parentId2 && n.fid === parentId1 );
    } );
}

function findChildrenForSingle ( parentId ) {
    return familyData.filter( n => n.mid === parentId || n.fid === parentId );
}

// --- Rendering Logic ---

function renderTree ( rootId ) {
    const container = document.getElementById( 'family-tree-container' );
    if ( !container ) return;

    // Clear previous
    container.innerHTML = '<ul>' + renderNodeRecursive( findNode( rootId ), new Set() ) + '</ul>';

    // Center the view initially
    resetZoom();
}

function renderNodeRecursive ( node, visited ) {
    if ( !node || visited.has( node.id ) ) return '';
    visited.add( node.id );

    // Identify Spouses
    const spouses = findSpouses( node );
    spouses.forEach( s => visited.add( s.id ) ); // Mark spouses as visited so we don't render them as separate roots later

    // HTML Construction
    const hasSpouse = spouses.length > 0;
    let html = `<li class="${ hasSpouse ? 'has-spouse' : '' }">`;

    // Member Container (The Couple)
    html += `<div class="member-container">`;

    // Primary Node
    html += renderMemberBox( node );

    // Spouses
    spouses.forEach( spouse => {
        html += `<div class="spouse-connector"></div>`;
        html += renderMemberBox( spouse );
    } );

    html += `</div>`; // End member-container

    // Children
    // We need to gather children of this node AND children of this node + spouse.
    // In many family trees, children are shared.
    // Let's gather all children where 'node' is a parent, OR 'spouse' is a parent.

    let children = [];

    // 1. Children of Node (regardless of spouse)
    let nodeChildren = findChildrenForSingle( node.id );

    // 2. Children of Spouses (if any, that might not list 'node' if data is messy, but usually consistent)
    // We filter uniqueness by ID.

    children = [ ...nodeChildren ]; // Start with node's children

    // If we want to be strict about lineages:
    // If I render "Rudran" and "Shylaja", I want children of (Rudran & Shylaja).
    // The current data structure has mid/fid on children.

    // Let's just create a Set of IDs to avoid duplicates
    let childIds = new Set( children.map( c => c.id ) );

    // Sort by age/id
    children.sort( ( a, b ) => a.id - b.id );

    if ( children.length > 0 ) {
        html += `<ul>`;
        children.forEach( child => {
            html += renderNodeRecursive( child, visited );
        } );
        html += `</ul>`;
    }

    html += `</li>`;
    return html;
}

function renderMemberBox ( node ) {
    const genderClass = node.gender ? node.gender : 'male';
    const hasImage = node.ImgUrl && node.ImgUrl.trim() !== "";

    // Fallback Icons (Bootstrap Icons class names)
    const iconClass = genderClass === 'female' ? 'bi-person-circle' : 'bi-person-fill';

    let imageHtml = '';
    if ( hasImage ) {
        // We can't easily check if file exists 404 client side without async, so we use onerror
        const fallbackIcon = genderClass === 'female' ? 'assets/images/avatars/female_default.svg' : 'assets/images/avatars/male_default.svg';
        // But better yet, let's just use the icon if it fails
        // We will insert an <i class> if image fails to load or just show icon if no url
        imageHtml = `<img src="${ node.ImgUrl }" alt="${ node.name }" onerror="this.onerror=null; this.parentElement.innerHTML='<i class=\\'bi ${ iconClass }\\' style=\\'font-size: 30px; color: #aaa;\\'></i>'">`;
    } else {
        imageHtml = `<i class="bi ${ iconClass }" style="font-size: 30px; color: #aaa;"></i>`;
    }

    // On click -> Focus on this person's lineage
    return `
        <div class="member-box ${ genderClass }" onclick="handleMemberClick(${ node.id })">
            <div class="member-image">
                ${ imageHtml }
            </div>
            <div class="member-info">
                <div class="member-name">${ node.name }</div>
                ${ node.role ? `<div class="member-role">${ node.role }</div>` : '' }
            </div>
        </div>
    `;
}

// --- Interaction Logic ---

function handleMemberClick ( id ) {
    // Find the oldest ancestor of this person to render the full context
    // This solves "Aparna's family" request.

    let current = findNode( id );
    if ( !current ) return;

    // Trace up: If this person has a registered father or mother in the list, go up.
    let ancestor = current;
    let safeguard = 0;
    while ( safeguard < 50 ) { // prevent infinite loop
        let parentId = ancestor.fid || ancestor.mid;
        if ( parentId ) {
            let parent = findNode( parentId );
            if ( parent ) {
                ancestor = parent;
                safeguard++;
                continue;
            }
        }
        // Also check if any SPOUSE has parents? 
        // If I click "Wife", and she has parents, I probably want to show HER parents tree?
        // But if I am in her husband's tree, clicking her might be "Focus on her".
        // Current logic: We just go up biological parents.
        break;
    }

    console.log( ` Focusing on lineage of ${ ancestor.name } (ancestor of clicked ${ current.name })` );
    renderTree( ancestor.id );
}

// --- Zoom & Pan Logic ---

function initZoomPan () {
    const container = document.getElementById( 'tree-wrapper' );
    const content = document.getElementById( 'family-tree-container' );

    if ( !container || !content ) return;

    container.addEventListener( 'mousedown', ( e ) => {
        isDragging = true;
        startX = e.clientX - panX;
        startY = e.clientY - panY;
        container.style.cursor = 'grabbing';
    } );

    window.addEventListener( 'mouseup', () => {
        isDragging = false;
        container.style.cursor = 'grab';
    } );

    window.addEventListener( 'mousemove', ( e ) => {
        if ( !isDragging ) return;
        e.preventDefault();
        panX = e.clientX - startX;
        panY = e.clientY - startY;
        updateTransform();
    } );

    // Wheel Zoom
    container.addEventListener( 'wheel', ( e ) => {
        e.preventDefault();
        const scaleAmount = 0.1;
        if ( e.deltaY < 0 ) {
            zoomLevel += scaleAmount;
        } else {
            zoomLevel = Math.max( 0.1, zoomLevel - scaleAmount );
        }
        updateTransform();
    } );
}

function updateTransform () {
    const content = document.getElementById( 'family-tree-container' );
    if ( content ) {
        content.style.transform = `translate(${ panX }px, ${ panY }px) scale(${ zoomLevel })`;
    }
}

function zoomIn () {
    zoomLevel += 0.2;
    updateTransform();
}

function zoomOut () {
    zoomLevel = Math.max( 0.2, zoomLevel - 0.2 );
    updateTransform();
}

function resetZoom () {
    zoomLevel = 1;
    panX = 0;
    panY = 0;
    updateTransform();

    // Try to center contents? 
    // Simple centering:
    const wrapper = document.getElementById( 'tree-wrapper' );
    const content = document.getElementById( 'family-tree-container' );
    if ( wrapper && content ) {
        // Center horizontally
        // We need content width.
        // Let's just set reasonably
        panX = ( wrapper.offsetWidth - content.offsetWidth ) / 2;
        // panY = 50; 
        // Since tree renders with UL/LI, width is dynamic. 
        // Just resetting to 0,0 is safest start.
        panX = 100; // minimal padding
        panY = 50;
        updateTransform();
    }
}


// --- Initialization ---

document.addEventListener( 'DOMContentLoaded', () => {
    // Start with a default root. 
    // ID 1 (Rudran) is central. Or ID 17 (Narayanan, his father).
    // Let's try to find a global root or just start with Rudran (1) or his parents (17).

    // We can iterate roots like before, but 'renderTree' expects a SINGLE root to draw a hierarchy.
    // If we have multiple disjoint trees, we might need a "Grid of Trees".
    // But for now, let's pick 17 (Narayanan - Father) as the default start.

    // Check if 17 exists (Rudran's Father)
    let startId = 17;
    if ( !findNode( startId ) ) startId = 1; // Fallback to Rudran

    renderTree( startId );
    initZoomPan();
} );
