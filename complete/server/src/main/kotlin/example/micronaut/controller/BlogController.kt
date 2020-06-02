package example.micronaut.controller

import example.micronaut.model.Blog
import example.micronaut.model.BlogService
import example.micronaut.model.BlogServiceImpl
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

    @Delete("/blog/{id}")
    open fun delete(id: Long?): HttpResponse<*>? {
        blogService?.deleteById(id)
        return HttpResponse.noContent<Any>()
    }


    private fun toUri(blog: Blog): URI? {
        return URI.create("/blog/" + blog.getId())
    }
}
