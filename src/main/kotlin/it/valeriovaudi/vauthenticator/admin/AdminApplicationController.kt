package it.valeriovaudi.vauthenticator.admin

import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.GetMapping

@Controller
class AdminApplicationController(
        @Value("\${vauthenticator.session-management.rp-iframe.host}") private val managementUiHost : String,
        @Value("\${vauthenticator.host}") private val vauthenticatorHost : String
        ) {

    @GetMapping("/secure/admin/index")
    fun view(model : Model) : String {
        model.addAttribute("rpSessionManagementIFrame", "$managementUiHost/session/management")
        model.addAttribute("opSessionManagementIFrame", "$vauthenticatorHost/session/management")
        return "secure/admin"
    }

}