package travel.sos.tourism.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import travel.sos.tourism.TeamMember;
import travel.sos.tourism.repository.TeamMemberRepository;

import java.util.List;

@Service
public class TeamMemberService {

    @Autowired
    private TeamMemberRepository teamMemberRepository;

    public TeamMember addTeamMember(TeamMember teamMember) {
        return teamMemberRepository.save(teamMember);
    }

    public List<TeamMember> getAllTeamMembers() {
        return teamMemberRepository.findAll();
    }
}