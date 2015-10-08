package hello.controller;

import hello.model.Hello;
import hello.repository.HelloRepository;
import hello.service.HelloService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

@RestController
@RequestMapping("/api/hello")
public class HelloController {

    private final Logger log = LoggerFactory.getLogger(HelloController.class);

    @Resource
    private HelloService service;

    /**
     * Get /hello -> get all hellos.
     */
    @RequestMapping(
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Hello> getAll() {
        log.debug("REST request to get all Hellos");
        return service.findAll();
    }

    @RequestMapping(value = "/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    public Hello findById(@PathVariable Long id) {
        log.debug("REST request to get a Hello with id: "+id);
        return service.findOne(id);
    }

    @RequestMapping(
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Hello persist(@RequestBody Hello hello) {
        log.debug("REST request to create a new Hello");
        return service.persist(hello);
    }

    @RequestMapping(value = "/{id}",
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public void delete(@PathVariable Long id) {
        log.debug("Rest request to delete a Hello with id: "+id);
        service.delete(id);
    }
}