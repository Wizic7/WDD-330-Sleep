import { checkLogin } from "./auth.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import loadTableOrders from "./currentOrders.mjs";

checkLogin();

loadHeaderFooter();

loadTableOrders("#ordertable");
