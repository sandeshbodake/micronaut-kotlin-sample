package example.micronaut.model

import javax.persistence.*
import javax.validation.constraints.NotNull


@Entity
@Table(name = "blog")
class Blog {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    var id: Long? = null

    @Column(name = "name", nullable = false, unique = true)
    var name: @NotNull String? = null

    constructor() {}

    constructor(name: @NotNull String?) {
        this.name = name
    }

    fun getId(): Any? {
        return id
    }
}