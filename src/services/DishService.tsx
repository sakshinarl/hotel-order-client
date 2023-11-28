
import { AxiosResponse } from "axios";
import API from "../api/API";
import endpoints from "../api/endpoints";
import Dish from "../shared/models/DishModel";

class DishService{
    static createDish(dish:Dish | FormData){
        return API.post(endpoints.api.dishes.create, dish);
    }
    static updateDish(id: string ,dish:Dish | FormData){
        return API.put(endpoints.api.dishes.update + id,dish);
    }
    static deleteDish(id: string){
        return API.delete(endpoints.api.dishes.delete + id);
    }
    static fetchOneDish(id:string){
        return API.get(endpoints.api.dishes.getOne + id);
    }
    static fetchAllDish(){
        return API.get(endpoints.api.dishes.getAll).then((response)=>{
            const dish = response?.data?.data;
            const updateData = 
            Array.isArray(dish) &&
            dish?.map((dish) => {
                return{
                    ...dish,
                    picture: dish?.picture
                    ?`${endpoints?.serverBaseUrl}/${dish?.picture}`
                    : "https://besttastechinesesk.com/img/placeholders/grey_fork_and_knife.png",

                };
            });
            response.data.data = updateData;
            return response;
        });
        
    }
}

export default DishService;