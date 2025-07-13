frappe.ui.form.on("Item", {
    refresh: function(frm) {
        hide_fields(frm);
    }
});


function hide_fields(frm) {
    if (frappe.session.user !== 'Administrator') {
        frm.toggle_display("reorder_section", false);
        frm.toggle_display("serial_nos_and_batches", false);
        frm.toggle_display("warranty_period", false);
        frm.toggle_display("default_material_request_type", false);
        frm.toggle_display("deferred_accounting_section", false);
        $('a.nav-link:contains("Purchasing")').parent('.nav-item').hide();
        $('a.nav-link:contains("Tax")').parent('.nav-item').hide();
        $('a.nav-link:contains("Sales")').parent('.nav-item').hide();
        $('a.nav-link:contains("Quality")').parent('.nav-item').hide();
        $('a.nav-link:contains("Manufacturing")').parent('.nav-item').hide();
        frm.toggle_display("over_delivery_receipt_allowance", false);
        frm.toggle_display("over_billing_allowance", false);
        frm.toggle_display("is_fixed_asset", false);
    }
}