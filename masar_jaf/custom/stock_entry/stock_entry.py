import frappe

def validate(self, method):
    # validate_warehouse(self)
    pass
def on_submit(self, method):
    create_material_issue(self)


def validate_warehouse(self):
    if self.items and self.custom_receipt_type:
        for item in self.items:
            if not item.t_warehouse:
                frappe.throw(f"Item {item.item_code} requires a target warehouse for material receipt.")
            if item.s_warehouse:
                frappe.throw(f"Item {item.item_code} should not have a source warehouse for material receipt.")

def create_material_issue(self):
    if self.custom_receipt_type in ["E2E", "E2Z"] and self.stock_entry_type == "Material Receipt":
        mi = frappe.new_doc("Stock Entry")
        mi.stock_entry_type = "Material Issue"
        mi.company = self.company
        mi.posting_date = self.posting_date
        mi.posting_time = self.posting_time
        mi.custom_receipt_type = self.custom_receipt_type
        mi.items = []
        for item in self.items:
            new_item = item.as_dict().copy()
            new_item['t_warehouse'] = None
            new_item['s_warehouse'] = item.get('t_warehouse')
            mi.append('items', new_item)
        mi.save()
        mi.submit()
        frappe.msgprint(f"Material Issue created: {mi.name}", alert=True, indicator='green')
            