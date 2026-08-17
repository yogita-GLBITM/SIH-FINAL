package travel.sos.tourism.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import travel.sos.tourism.SOS;
import travel.sos.tourism.TeamMember;
import travel.sos.tourism.repository.SOSRepository;
import travel.sos.tourism.repository.TeamMemberRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SOSService {
    @Autowired
    private SOSRepository sosRepository;

    public SOS createSOS(SOS sos) {
        sos.setStatus("ACTIVE");
        sos.setCreatedAt(LocalDateTime.now());
        if (sos.getTeamMemberId() != null) {

            TeamMember teamMember =
                    teamMemberRepository.findById(sos.getTeamMemberId())
                            .orElseThrow(() -> new RuntimeException("Team member not found"));

            sos.setTeamMember(teamMember);
        }
        return sosRepository.save(sos);
    }
    public List<SOS> getAllSOS() {

        return sosRepository.findAll();
    }
    @Autowired
    private TeamMemberRepository teamMemberRepository;
    public List<SOS>getSOSForTeamMember(Long teamMemberId){
        return sosRepository.findByTeamMember_Id(teamMemberId);
    }
    public SOS acceptSOS(Long sosId) {

        SOS sos = sosRepository.findById(sosId)
                .orElseThrow(() -> new RuntimeException("SOS not found"));

        sos.setStatus("ACCEPTED");

        return sosRepository.save(sos);
    }
}
