package com.vauthenticator.management.web

import com.vauthenticator.management.document.Document
import com.vauthenticator.management.document.DocumentRepository
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty
import org.springframework.cache.caffeine.CaffeineCache
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController

@RestController
@ConditionalOnProperty("asset-server.on-s3.enabled", havingValue = "true", matchIfMissing = true)
class StaticController(
    private val documentRepository: DocumentRepository,
    private val staticContentLocalCache: CaffeineCache
) {

    @GetMapping("/static/content/asset/{assetName}")
    fun assetContent(@PathVariable assetName: String): ResponseEntity<*> {
        staticContentLocalCache.get(assetName, Document::class.java)!!
        val document = documentRepository.loadDocument("static-management-ui", "content/asset/$assetName")

        return ResponseEntity.ok()
            .header("Content-Type", document.contentType)
            .body(document.content)
    }

}