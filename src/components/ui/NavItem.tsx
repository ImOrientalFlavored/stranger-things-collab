interface NavItemProp{
    props: any;
}

/*
.nav-itm
*/

export default function NavItem({props}:NavItemProp){
    return(
        <li className="nav-item">
            <a href="#" className="icon-button">
                {props.item};
            </a>
        </li>
    );
}