package com.vauthenticator.management.document

import software.amazon.awssdk.services.s3.S3Client
import software.amazon.awssdk.services.s3.model.GetObjectRequest

class S3DocumentRepository(
    private val s3Client: S3Client,
    private val buketName: String
) : DocumentRepository {

    override fun loadDocument(type: String, path: String): Document {
        println("type: $type")
        println("path: $path")
        val request = GetObjectRequest.builder().bucket(buketName).key("$type/$path").build()
        val response = s3Client.getObject(request)

        return Document(
            contentType = response.response().contentType(),
            content = response.readAllBytes()
        )
    }
}