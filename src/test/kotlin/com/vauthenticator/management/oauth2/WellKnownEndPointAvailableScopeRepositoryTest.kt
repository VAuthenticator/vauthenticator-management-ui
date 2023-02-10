package com.vauthenticator.management.oauth2

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.github.tomakehurst.wiremock.WireMockServer
import com.github.tomakehurst.wiremock.client.WireMock.*
import com.github.tomakehurst.wiremock.core.WireMockConfiguration
import com.vauthenticator.management.FileUtils
import com.vauthenticator.management.oauth2.ScopeFixture.scopes
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.web.client.RestTemplate

class WellKnownEndPointAvailableScopeRepositoryTest {

    private var wireMockServer: WireMockServer = WireMockServer(WireMockConfiguration.options().dynamicHttpsPort().dynamicPort())

    @BeforeEach
    fun setUp() {
        wireMockServer.start()
    }

    @AfterEach
    fun tearDown() {
        wireMockServer.stop()
    }

    @Test
    fun `happy path`() {
        stubFor(
            get("/.well-known/openid-configuration")
                .willReturn(
                    ok(FileUtils.loadFileFor("openid-configuration.json"))
                )
        )

        val underTest =
            WellKnownEndPointAvailableScopeRepository(
                jacksonObjectMapper(),
                "http://localhost:${wireMockServer.port()}",
                RestTemplate()
            )


        assertEquals(scopes, underTest.getScopes())
    }
}