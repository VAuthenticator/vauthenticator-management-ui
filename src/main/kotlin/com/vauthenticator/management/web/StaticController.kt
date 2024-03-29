package com.vauthenticator.management.web

import com.vauthenticator.document.repository.Document
import org.slf4j.LoggerFactory
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty
import org.springframework.cache.caffeine.CaffeineCache
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController

@RestController
@ConditionalOnProperty("asset-server.on-s3.enabled", havingValue = "true", matchIfMissing = true)
class StaticController(private val staticAssetDocumentLocalCache: CaffeineCache) {

    private val logger = LoggerFactory.getLogger(StaticController::class.java)

    @GetMapping("/static/content/asset/{assetName}")
    fun assetContent(@PathVariable assetName: String): ResponseEntity<*> {
        logger.info("assetName : $assetName")
        val document = staticAssetDocumentLocalCache.get(assetName, Document::class.java)!!


        return ResponseEntity.ok()
            .header("Content-Type", document.contentType)
            .body(document.content)
    }

}