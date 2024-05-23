
type Navlink = {
  name:string,
  path:string,
  icon?:string
}

const navlinks:Navlink[]=[
  {
      name:"acceuil",
      path:"/"
  },
  {
      name:"trouverUnPro",
      path:"/trouver-un-pro"
  },
 
]

const authLinks: Navlink[] = [
  {
    name: "seConnecter",
    path: "/se-connecter"
  },
  {
    name: "sInscrire",
    path: "/sinscrire"
  }
];


export {type Navlink,navlinks,authLinks}