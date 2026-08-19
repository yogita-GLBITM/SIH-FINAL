package travel.sos.tourism.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import travel.sos.tourism.SOS;

import java.util.List;

public interface SOSRepository extends JpaRepository<SOS,Long> {
    List<SOS> findByTeamMember_Id(Long teamMemberId);
}
