package it.valeriovaudi.vauthenticator.config

import it.valeriovaudi.vauthenticator.proxy.ApiServiceCallProxyService
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration(proxyBeanMethods = false)
class ProxyConfig {

    @Bean
    fun apiServiceCallProxyService() =
            ApiServiceCallProxyService("/secure")

}