package travel.sos.tourism;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class SOS {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private Double latitude;

    private Double longitude;

    private String emergencyType;

    private String status;

    private LocalDateTime createdAt;
    @ManyToOne
    @JoinColumn(name="team_member_id")
    private TeamMember teamMember;
    @Transient
    private Long teamMemberId;
}