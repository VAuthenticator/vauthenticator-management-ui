package com.vauthenticator.management.oauth2

import org.springframework.http.ResponseEntity
import org.springframework.http.ResponseEntity.*
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class AvailableScopesEndPoint(private val availableScopeRepository: AvailableScopeRepository) {
    @GetMapping("/scopes")
    fun availableScopes() =
        ok().body(availableScopeRepository.getScopes())
}

@JvmInline
value class Scope(val content: String)

@JvmInline
value class Scopes(val content: List<Scope>)
interface AvailableScopeRepository {

    fun getScopes(): Scopes
}

class WellKnownEndPointAvailableScopeRepository : AvailableScopeRepository {
    override fun getScopes(): Scopes {
        TODO("Not yet implemented")
    }

}