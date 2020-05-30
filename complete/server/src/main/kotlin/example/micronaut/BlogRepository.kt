package example.micronaut


import io.micronaut.data.annotation.*
import io.micronaut.data.model.*
import io.micronaut.data.repository.CrudRepository

@Repository
interface BlogRepository : CrudRepository<Book, Long> {
    fun find(title: String): Book
}