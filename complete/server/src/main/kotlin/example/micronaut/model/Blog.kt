package example.micronaut.model

import javax.persistence.*
import javax.validation.constraints.NotNull


@Entity
@Table(name = "blogs")
class Blog {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    var id: Long? = null

    @Column(name = "title", nullable = false)
    var title: String? = null

    @Column(name = "sub_title", nullable = false)
    var sub_title: @NotNull String? = null

    @Column(name = "content", nullable = false, length=1024)
    var content: @NotNull String? = null
    constructor() {}

    constructor(title: @NotNull String?, sub_title: @NotNull String?, content: @NotNull String?) {
        this.title = title
        this.sub_title = sub_title
        this.content = content
    }

}