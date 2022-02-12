import ContainerFirebase from "../../containers/ContainerFirebase.js";

export default class ProductsDaoFirebase extends ContainerFirebase {
	constructor() {
		super("products");
	}
}
