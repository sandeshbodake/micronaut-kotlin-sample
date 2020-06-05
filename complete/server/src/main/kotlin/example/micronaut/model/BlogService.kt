package example.micronaut.model

import java.util.*
import javax.validation.constraints.NotBlank
import javax.validation.constraints.NotNull


interface BlogService {
    fun findById(id: @NotNull Long?): Optional<Blog>

    fun save(blog: @NotNull Blog?): Blog?

    fun deleteById(id: Long?)

    fun findAll(): List<Blog?>?

    fun update(id: @NotNull Long?, title: @NotBlank String, sub_title: @NotBlank String, content: String): Int?

    fun search(key: String): List<Blog?>?
}