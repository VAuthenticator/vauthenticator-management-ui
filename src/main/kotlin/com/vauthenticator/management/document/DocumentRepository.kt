package com.vauthenticator.management.document

interface DocumentRepository {

    fun loadDocument(type: String, path: String): Document

}