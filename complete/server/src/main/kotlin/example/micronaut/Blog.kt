package example.micronaut

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id

@Entity
data class Book(@Id
                @GeneratedValue
                var id: Long,
                var title: String,
                var pages: Int = 0,
                var content: String)