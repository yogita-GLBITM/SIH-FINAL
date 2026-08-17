package travel.sos.tourism.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import travel.sos.tourism.TeamMember;

public interface TeamMemberRepository extends JpaRepository<TeamMember,Long> {
}
