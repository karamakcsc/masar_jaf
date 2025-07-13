frappe.ui.form.on("Stock Entry", {
    custom_receipt_type: function(frm) {
        if (frm.doc.custom_receipt_type) {
            frm.doc.stock_entry_type = "Material Receipt";
            frm.set_df_property("stock_entry_type", "read_only", 1);
            frm.refresh_field("stock_entry_type");
        }
    },
    refresh: function(frm) {
        hide_fields(frm);
    }
});


function hide_fields(frm) {
    if (frappe.session.user !== 'Administrator') {
        frm.toggle_display("bom_info_section", false);
        frm.toggle_display("inspection_required", false);
        $('a.nav-link:contains("Other Info")').parent('.nav-item').hide();
    }
}