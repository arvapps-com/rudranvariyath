//JavaScript

FamilyTree.templates.myTemplate = Object.assign({}, FamilyTree.templates.tommy);
FamilyTree.templates.myTemplate.size = [200, 200];
FamilyTree.templates.myTemplate.node =
    '<circle cx="100" cy="100" r="100" fill="#039BE5" stroke-width="1" stroke="#aeaeae"></circle>';

FamilyTree.templates.myTemplate.defs = ``;

FamilyTree.templates.myTemplate.ripple = {
    radius: 100,
    color: "#e6e6e6",
    rect: null
};
FamilyTree.templates.myTemplate.img_0 =
    '<clipPath id="ulaImg">'
    + '<circle cx="100" cy="150" r="40"></circle>'
    + '</clipPath>'
    + '<image preserveAspectRatio="xMidYMid slice" clip-path="url(#ulaImg)" xlink:href="{val}" x="60" y="110" width="80" height="80">'
    + '</image>';
FamilyTree.templates.myTemplate.field_0 = '<text style="font-size: 24px;" fill="#ffffff" x="100" y="90" text-anchor="middle">{val}</text>';
FamilyTree.templates.myTemplate.field_1 = '<text style="font-size: 16px;" fill="#ffffff" x="100" y="60" text-anchor="middle">{val}</text>';

FamilyTree.templates.myTemplate.link =
    '<path stroke="#686868" stroke-width="1px" fill="none" data-l-id="[{id}][{child-id}]" d="M{xa},{ya} C{xb},{yb} {xc},{yc} {xd},{yd}" />';

FamilyTree.templates.myTemplate.nodeMenuButton =
    '<g style="cursor:pointer;" transform="matrix(1,0,0,1,93,15)" data-ctrl-n-menu-id="{id}">'
    + '<rect x="-4" y="-10" fill="#000000" fill-opacity="0" width="22" height="22">'
    + '</rect>'
    + '<line x1="0" y1="0" x2="0" y2="10" stroke-width="2" stroke="rgb(255, 202, 40)" />'
    + '<line x1="7" y1="0" x2="7" y2="10" stroke-width="2" stroke="rgb(255, 202, 40)" />'
    + '<line x1="14" y1="0" x2="14" y2="10" stroke-width="2" stroke="rgb(255, 202, 40)" />'
    + '</g>';

FamilyTree.templates.myTemplate.menuButton =
    '<div style="position:absolute;right:{p}px;top:{p}px; width:40px;height:50px;cursor:pointer;" data-ctrl-menu="">'
    + '<hr style="background-color: rgb(255, 202, 40); height: 3px; border: none;">'
    + '<hr style="background-color: rgb(255, 202, 40); height: 3px; border: none;">'
    + '<hr style="background-color: rgb(255, 202, 40); height: 3px; border: none;">'
    + '</div>';

FamilyTree.templates.myTemplate.pointer =
    '<g data-pointer="pointer" transform="matrix(0,0,0,0,100,100)">><g transform="matrix(0.3,0,0,0.3,-17,-17)">'
    + '<polygon fill="rgb(255, 202, 40)" points="53.004,173.004 53.004,66.996 0,120" />'
    + '<polygon fill="rgb(255, 202, 40)" points="186.996,66.996 186.996,173.004 240,120" />'
    + '<polygon fill="rgb(255, 202, 40)" points="66.996,53.004 173.004,53.004 120,0" />'
    + '<polygon fill="rgb(255, 202, 40)" points="120,240 173.004,186.996 66.996,186.996" />'
    + '<circle fill="rgb(255, 202, 40)" cx="120" cy="120" r="30" />'
    + '</g></g>';

FamilyTree.templates.myTemplate_male = Object.assign({}, FamilyTree.templates.myTemplate);
FamilyTree.templates.myTemplate_male.node = '<circle cx="100" cy="100" r="100" fill="#039BE5" stroke-width="1" stroke="#aeaeae"></circle>';
FamilyTree.templates.myTemplate_female = Object.assign({}, FamilyTree.templates.myTemplate);
FamilyTree.templates.myTemplate_female.node = '<circle cx="100" cy="100" r="100" fill="#FF46A3" stroke-width="1" stroke="#FF46A3"></circle>';

async function createFamilyTree() {
    // var ;
    var family = new FamilyTree(document.getElementById("tree"), {
      // scaleInitial: FamilyTree.match.width,
      scaleInitial: FamilyTree.match.boundary,
      editForm: { titleBinding: "Name", photoBinding: "ImgUrl" },
      // scaleInitial:FamilyTree.match.height ,
      template: "myTemplate",
      nodeBinding: {
        field_0: "name",
      },
      nodes: [
        {
          id: 1,
          pids: [2],
          mid: 16,
          fid: 17,
          name: "Rudran Variyath",
          ImgUrl: "assets/images/avatars/avatar.jpg",
        },
        { id: 2, pids: [1], mid: 14, fid: 15, name: "Shylaja M N" },
        { id: 3, pids: [4], mid: 2, fid: 1, name: "Arun R Variyath" },
        { id: 4, pids: [3], mid: 28, fid: 29, name: "Aparna" },
        { id: 5, mid: 4, fid: 3, name: "Adhisree A V" },
        { id: 6, pids: [7], mid: 2, fid: 1, name: "Anjitha R Variyath" },
        { id: 7, pids: [6], mid: 10, fid: 11, name: "Vijil" },
        { id: 8, mid: 6, fid: 7, name: "Rishikesh" },
        { id: 9, mid: 2, fid: 1, name: "Anoop R Variyath" },
        { id: 11, pids: [12], name: "Das" },
        { id: 12, pids: [11], name: "Vijaya" },
        { id: 13, mid: 10, fid: 11, name: "Vipin" },
        { id: 14, pids: [15], name: "Nandini" },
        { id: 15, pids: [14], name: "Venugopalamenon" },
        { id: 16, pids: [17], name: "Seemanndini" },
        { id: 17, pids: [16], name: "Narayanan" },
        { id: 18, pids: [24], mid: 14, fid: 15, name: "Baburaj" },
        { id: 19, mid: 14, fid: 15, name: "Biju M" },
        { id: 20, pids: [21], mid: 14, fid: 15, name: "Anilkumar M" },
        { id: 21, pids: [20], name: "Keerthy V" },
        { id: 22, mid: 21, fid: 20, name: "Anandhakrishnan" },
        { id: 23, mid: 21, fid: 20, name: "Aryanandha" },
        { id: 24, pids: [18], name: "Anu K" },
        { id: 25, mid: 24, fid: 18, name: "Anjana" },
        { id: 26, mid: 24, fid: 18, name: "Adhidev" },
        { id: 27, mid: 24, fid: 18, name: "Archana" },
        { id: 28, pids: [29], mid: 31, fid: 30, name: "Jayarani" },
        { id: 29, pids: [28], mid: 67, fid: 66, name: "Mohandas" },
        { id: 30, pids: [31], name: "Rani's Dad" },
        { id: 31, pids: [30], name: "Rani's Mom" },
        { id: 51, pids: [34], mid: 31, fid: 30, name: "Raji" },
        { id: 52, pids: [37], mid: 31, fid: 30, name: "Omana" },
        { id: 32, pids: [35], mid: 31, fid: 30, name: "Thankamani" },
        { id: 33, pids: [36], mid: 31, fid: 30, name: "Sathyabhama" },
        { id: 34, pids: [51], mid: 39, fid: 38, name: "Venu" },
        { id: 35, pids: [32], mid: 40, fid: 41, name: "Sethu" },
        { id: 36, pids: [33], mid: 43, fid: 42, name: "Murali" },
        { id: 37, pids: [52], mid: 45, fid: 44, name: "Kavya's Dad" },
        { id: 38, pids: [39], name: "Venu's Dad" },
        { id: 39, pids: [38], name: "Venu's Mom" },
        { id: 40, pids: [41], name: "Sethu's Dad" },
        { id: 41, pids: [40], name: "Sethu's Mom" },
        { id: 42, pids: [43], name: "Murali Vallyachan's Dad" },
        { id: 43, pids: [42], name: "Murali Vallyachan's Mom" },
        { id: 44, pids: [45], name: "Kavya's Dad's Dad" },
        { id: 45, pids: [44], name: "Kavya's Dad's Mom" },
        { id: 46, pids: [47], mid: 51, fid: 34, name: "Vinu" },
        { id: 47, pids: [46], mid: 48, fid: 49, name: "Devu" },
        { id: 48, pids: [49], name: "Devu's Mom" },
        { id: 49, pids: [48], name: "Devu's Dad" },
        { id: 50, mid: 48, fid: 49, name: "Anand" },
        { id: 53, pids: [56], mid: 52, fid: 37, name: "Keerthy" },
        { id: 54, pids: [55], mid: 52, fid: 37, name: "Kavya" },
        { id: 55, pids: [54], name: "Murali(kavya)" },
        { id: 56, pids: [53], name: "Manjunadh" },
        { id: 57, mid: 53, fid: 56, name: "Archa" },
        { id: 58, mid: 54, fid: 55, name: "Vaiga" },
        { id: 59, mid: 54, fid: 55, name: "Keshav" },
        { id: 60, pids: [61], mid: 33, fid: 36, name: "Veena" },
        { id: 61, pids: [60], name: "Praveen" },
        { id: 62, mid: 33, fid: 36, name: "Vishnu" },
        { id: 63, pids: [64], mid: 32, fid: 35, name: "Saju" },
        { id: 64, pids: [63], name: "Ramya" },
        { id: 65, mid: 32, fid: 35, name: "Sharath" },
        { id: 66, pids: [67], name: "Mohandas's Father" },
        { id: 67, pids: [66], name: "Mohandas's Mother" },
        { id: 68, pids: [69], mid: 67, fid: 66, name: "Mema" },
        { id: 69, pids: [68], name: "Mema's Husband" },
        { id: 70, pids: [71], mid: 67, fid: 66, name: "Mummy" },
        { id: 71, pids: [70], name: "Pappa" },
      ],
    });
    // family.load(jsonData);
    family.on("click", function (sender, args) {
      // sender.editUI.show(args.node.id, false);
      sender.editUI.show(args.node.id, true); //  details mode
      return false; //to cansel the click event
    });
  }