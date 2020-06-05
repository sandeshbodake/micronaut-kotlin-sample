package example.micronaut.model

import io.micronaut.configuration.hibernate.jpa.scope.CurrentSession
import io.micronaut.runtime.ApplicationConfiguration
import io.micronaut.spring.tx.annotation.Transactional
import java.util.*
import javax.inject.Singleton
import javax.persistence.EntityManager
import javax.persistence.PersistenceContext
import javax.persistence.TypedQuery
import javax.validation.constraints.NotBlank
import javax.validation.constraints.NotNull

@Singleton
open class BlogServiceImpl : BlogService{

    @PersistenceContext
    private var entityManager: EntityManager? = null
    private var applicationConfiguration: ApplicationConfiguration? = null

    fun BlogServiceImpl(@CurrentSession entityManager: EntityManager?,
                            applicationConfiguration: ApplicationConfiguration?) {
        this.entityManager = entityManager
        this.applicationConfiguration = applicationConfiguration
    }

    @Transactional(readOnly = true)
    override fun findById(id: Long?): Optional<Blog> {
        return Optional.ofNullable(entityManager?.find(Blog::class.java, id))

    }

    @Transactional
    override fun save(blog: @NotNull Blog?): Blog? {
        entityManager?.persist(blog)
        return blog
    }

    @Transactional
    override fun deleteById(id: @NotNull Long?) {
        findById(id)!!.ifPresent { blog: Blog? -> entityManager!!.remove(blog) }
    }

    @Transactional(readOnly = true)
    override fun findAll(): List<Blog?>? {
        val qlString = "SELECT e FROM Blog as e"
        val query: TypedQuery<Blog> = entityManager!!.createQuery(qlString, Blog::class.java)
        query.maxResults = 50
        return query.resultList
    }

    @Transactional(readOnly = true)
    override fun search(key: String): List<Blog?>? {
        val qlString = "SELECT e FROM Blog as e WHERE title LIKE :title OR sub_title LIKE :sub_title"
        val query: TypedQuery<Blog> = entityManager!!.createQuery(qlString, Blog::class.java)
                                                     .setParameter("title", key)
                                                     .setParameter("sub_title", key)
        query.maxResults = 50
        return query.resultList
    }

    @Transactional
    override fun update(id: @NotNull Long?, title: @NotBlank String, sub_title: @NotBlank String, content: String): Int? {
        return entityManager!!.createQuery("UPDATE Blog g SET title = :title, sub_title = :sub_title, content = :content  where id = :id")
                .setParameter("title", title)
                .setParameter("sub_title", sub_title)
                .setParameter("content", content)
                .setParameter("id", id)
                .executeUpdate()
    }

}