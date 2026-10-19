import Controller from "sap/ui/core/mvc/Controller";
import JSONModel from "sap/ui/model/json/JSONModel";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import ListBinding from "sap/ui/model/ListBinding";
import Event from "sap/ui/base/Event";
import ObjectListItem from "sap/m/ObjectListItem";
import UIComponent from "sap/ui/core/UIComponent";
import Context from "sap/ui/model/Context";
import SearchField from "sap/m/SearchField";
import ComboBox from "sap/m/ComboBox";
import Table from "sap/m/Table";

/**
 * @namespace ui5.tutorial.walkthrough.controller
 */
export default class App extends Controller {
	onInit(): void {
		const viewModel = new JSONModel({
			currency: "EUR"
		});
		this.getView()?.setModel(viewModel, "view");
	}

	onFilterInvoices(): void {
		const filters: Filter[] = [];

		const query = (this.byId("searchField") as SearchField).getValue();
		const status = (this.byId("statusFilter") as ComboBox).getSelectedKey();

		if (query) {
			filters.push(new Filter("ProductName", FilterOperator.Contains, query));
		}
		if (status && status !== "All") {
			filters.push(new Filter("Status", FilterOperator.EQ, status));
		}

		const table = this.byId("invoiceList") as Table;
		(table.getBinding("items") as ListBinding).filter(filters);
	}

	onPress(event: Event): void {
		const item = event.getSource() as ObjectListItem;
		const router = UIComponent.getRouterFor(this);
		router.navTo("detail", {
			invoicePath: window.encodeURIComponent((item.getBindingContext("invoice") as Context).getPath().substring(1))
		});
	}
};
