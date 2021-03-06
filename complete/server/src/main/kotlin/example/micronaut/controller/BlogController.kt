package example.micronaut.controller

import example.micronaut.model.Blog
import example.micronaut.model.BlogService
import io.micronaut.http.HttpResponse
import io.micronaut.http.MediaType
import io.micronaut.http.annotation.*
import io.micronaut.security.annotation.Secured
import io.micronaut.security.rules.SecurityRule
import java.net.URI
import javax.inject.Inject
import javax.validation.Valid


@Secured(SecurityRule.IS_AUTHENTICATED)
@Controller
open class BlogController {

    @Inject
    protected var blogService: BlogService? = null

    @Produces(MediaType.APPLICATION_JSON)
    @Get("/blogs")
    fun index(): List<Blog?>? {
        return blogService?.findAll()
    }

    @Produces(MediaType.APPLICATION_JSON)
    @Get("/blog/{id}")
    fun show(id: Long): Blog? {
        return blogService?.findById(id)?.orElse(null);
    }

    @Post("/blog")
    fun save(@Body blog: @Valid Blog): HttpResponse<Blog?>? {
        blogService?.save(blog)
        return HttpResponse
                .created(blog)
                .headers { headers -> headers.location(blog?.let { toUri(it) }) }
    }

    @Put("/blog/{id}")
    fun update(@Body blog: @Valid Blog, id: Long): Int? {
        return blog.title?.let { blog.sub_title?.let { it1 -> blog.content?.let { it2 -> blogService    ?.update(id, it, it1, it2) } } }
    }

    @Delete("/blog/{id}")
    open fun delete(id: Long?): HttpResponse<*>? {
        blogService?.deleteById(id)
        return HttpResponse.noContent<Any>()
    }

    @Get("/search_blogs")
    open fun search(key: String): List<Blog?>? {
        return blogService?.search(key)
    }

    private fun toUri(blog: Blog): URI? {
        return URI.create("/blog/" + blog.id)
    }
}
