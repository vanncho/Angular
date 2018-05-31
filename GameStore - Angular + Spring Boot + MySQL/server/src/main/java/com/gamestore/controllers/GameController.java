package com.gamestore.controllers;

import com.gamestore.models.Game.binding.AddEditGameModel;
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

    @PostMapping("/allUserGames")
    public ResponseEntity<List<GameListModel>> listAllGamesForUser(@RequestBody Long userId) {

        List<GameListModel> games = gameService.getAllGamesForUser(userId);

        return new ResponseEntity<>(games, HttpStatus.OK);
    }

    @GetMapping("/details/{id}")
    public ResponseEntity<GameModel> getGameById(@PathVariable(name = "id") Long gameId) {

        GameModel game = gameService.getGameById(gameId);

        return new ResponseEntity<>(game, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity addGame(@RequestBody AddEditGameModel gameModel) {

        boolean isSaved = gameService.addGame(gameModel);

        if (isSaved) {
            return new ResponseEntity(HttpStatus.OK);
        }

        return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity editGame(@RequestBody AddEditGameModel editGameModel, @PathVariable(name = "id") Long gameId) {

        boolean isEdited = gameService.editGameById(editGameModel, gameId);

        if (isEdited) {
            return new ResponseEntity(HttpStatus.OK);
        }

        return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity deleteGame(@PathVariable(name = "id") Long gameId) {

        boolean isDeleted = gameService.deleteGameById(gameId);

        if (isDeleted) {
            return new ResponseEntity(HttpStatus.OK);
        }

        return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }
}
