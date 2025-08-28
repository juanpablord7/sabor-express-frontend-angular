import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {FontAwesomeModule} from "@fortawesome/angular-fontawesome"
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-navbar',
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router:Router){

  }
  //Navegar:
  //const navigate = useNavigate();

  loading: Boolean = true;

  //Acceder al contexto:
  openCart(){
    console.log("Se abrio")
  }
  cartQuantity = 1;
  //const { openCart, cartQuantity } = useShoppingCart();
  //const { user, role } = useUser();
  
  isEmployee = false;
  isLogged: Boolean = false;

  navigateLogin(){
    this.router.navigate(["login"])
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
