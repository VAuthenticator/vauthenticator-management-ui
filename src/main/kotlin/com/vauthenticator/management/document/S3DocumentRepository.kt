package com.vauthenticator.management.document

import org.slf4j.LoggerFactory
import software.amazon.awssdk.services.s3.S3Client
import software.amazon.awssdk.services.s3.model.GetObjectRequest

class S3DocumentRepository(
    private val s3Client: S3Client,
    private val buketName: String
) : DocumentRepository {

    private val logger = LoggerFactory.getLogger(S3DocumentRepository::class.java)
    override fun loadDocument(type: String, path: String): Document {
        val request = GetObjectRequest.builder().bucket(buketName).key("$type/$path").build()
        val response = s3Client.getObject(request)

        return Document(
            contentType = response.response().contentType(),
            content = response.readAllBytes()
        )
    }
}