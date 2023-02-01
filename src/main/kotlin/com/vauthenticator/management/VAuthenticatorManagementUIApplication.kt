package com.vauthenticator.management

import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ModelAttribute


@SpringBootApplication
class VAuthenticatorManagementUIApplication

fun main(args: Array<String>) {
    runApplication<VAuthenticatorManagementUIApplication>(*args)
}

@ControllerAdvice
class BaseUiModelInjector(
    @Value("\${vauthenticator.host}") private val vauthenticatorHost: String,
    @Value("\${vauthenticator.session-management.rp-iframe.host}") private val managementUiHost: String,
    @Value("\${assetServer.baseUrl:http://localhost:3000/asset}") private val assetServerBaseUrl: String
) {

    @ModelAttribute("assetServerBaseUrl")
    fun assetServerBaseUrl() = assetServerBaseUrl

    @ModelAttribute("rpSessionManagementIFrame")
    fun rpSessionManagementIFrame() = "$managementUiHost/session/management"

    @ModelAttribute("opSessionManagementIFrame")
    fun opSessionManagementIFrame() = "$vauthenticatorHost/session/management"

}