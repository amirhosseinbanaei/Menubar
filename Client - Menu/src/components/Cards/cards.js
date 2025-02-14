// Cards :
import VerticalItem from "./VerticalItem";
import HorizentalItem from "./HorizentalItem";

// Cards Loading :
import CategroyCardLoading from "./Category/loading";
import HorizentalItemLoading from "./HorizentalItem/loading";
import CategroyCard from "./Category";
import CartCard from "./Cart";
import FavoriteCard from "./Favorite";

const cards = {
   horizentalItem: {
      main: HorizentalItem,
      loading: HorizentalItemLoading
   },
   verticalItem: {
      main: VerticalItem,
      // loading: verticalItemLoading
   },
   category: {
      main: CategroyCard,
      loading: CategroyCardLoading,
   },
   cart: {
      main: CartCard
   },
   favorite: {
      main: FavoriteCard
   }
};

export default cards;