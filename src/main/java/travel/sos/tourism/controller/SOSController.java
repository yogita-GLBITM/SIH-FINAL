package travel.sos.tourism.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import travel.sos.tourism.SOS;
import travel.sos.tourism.Service.SOSService;

import java.util.List;

@RestController
@RequestMapping("/api/sos")
@CrossOrigin
public class SOSController {

    @Autowired
    private SOSService sosService;

    @PostMapping
    public SOS createSOS(@RequestBody SOS sos) {

        return sosService.createSOS(sos);
    }
    @GetMapping
    public List<SOS> getAllSOS() {
        return sosService.getAllSOS();
    }
    @PutMapping("{sosId}/accept")
    public SOS acceptSOS(@PathVariable Long sosId){
        return sosService.acceptSOS(sosId);
    }
}

