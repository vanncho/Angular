package com.gamestore.controllers.Game;

import com.gamestore.models.Game.view.GameListModel;
import com.gamestore.models.Game.view.GameModel;
import com.gamestore.services.interfaces.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/api")
public class GameController {

    private final GameService gameService;

    @Autowired
    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @GetMapping("/allGames")
    public ResponseEntity<List<GameListModel>> listAllGames() {

        List<GameListModel> games = gameService.getAllGames();

        return new ResponseEntity<>(games, HttpStatus.OK);
    }

    @GetMapping("/details/{id}")
    public ResponseEntity<GameModel> listAllGames(@PathVariable(name = "id") Long gameId) {

        GameModel game = gameService.getGameById(gameId);

        return new ResponseEntity<>(game, HttpStatus.OK);
    }
}
