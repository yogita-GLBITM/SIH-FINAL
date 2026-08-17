package travel.sos.tourism.controller;

import jakarta.persistence.Id;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import travel.sos.tourism.SOS;
import travel.sos.tourism.Service.SOSService;
import travel.sos.tourism.TeamMember;
import travel.sos.tourism.Service.TeamMemberService;

import java.util.List;

@RestController
@RequestMapping("/api/team")
@CrossOrigin(origins = "*")
public class TeamMemberController {

    @Autowired
    private TeamMemberService teamMemberService;
    @Autowired
    private SOSService sOSService;

    @PostMapping
    public TeamMember addTeamMember(@RequestBody TeamMember teamMember) {
        return teamMemberService.addTeamMember(teamMember);
    }

    @GetMapping
    public List<TeamMember> getAllTeamMembers() {
        return teamMemberService.getAllTeamMembers();
    }
    @GetMapping("/{teamMemberId}/sos")
    public List<SOS>getTeamMemberSOS(@PathVariable Long teamMemberId){
        return sOSService.getSOSForTeamMember(teamMemberId);
    }
}