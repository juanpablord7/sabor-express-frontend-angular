import { Component } from '@angular/core';

import {FontAwesomeModule} from "@fortawesome/angular-fontawesome"

@Component({
  selector: 'app-navbar',
  imports: [ FontAwesomeModule ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  //Navegar:
  //const navigate = useNavigate();

  loading: Boolean = true;

  //Acceder al contexto:
  openCart(){
    console.log("Hola")
  }
  cartQuantity = 1;
  //const { openCart, cartQuantity } = useShoppingCart();
  //const { user, role } = useUser();
  
  isEmployee = false;
  isLogged: Boolean = false;

  navigateLogin(){
    console.log("Hola")
  }
  
  //Ver
  /*
  if (
    role?.editPassword ||
    role?.manageOrder ||
    role?.manageProduct ||
    role?.manageRole ||
    role?.manageUser) {

    isEmployee = true;
  }

  useEffect(() => {
    setLoading(true);
    
    if(!!user){
      setIsLogged(true)
    }else{
      setIsLogged(false)
    }

    setLoading(false)
  }, [user]);
  */
}
