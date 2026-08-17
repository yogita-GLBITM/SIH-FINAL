package travel.sos.tourism;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class TeamMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String phone;

    private String email;

    private String team;

    private Boolean active;
}