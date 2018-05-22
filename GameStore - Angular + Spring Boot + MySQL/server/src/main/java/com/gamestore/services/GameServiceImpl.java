package com.gamestore.services;

import com.gamestore.entities.Game;
import com.gamestore.models.Game.view.GameListModel;
import com.gamestore.models.Game.view.GameModel;
import com.gamestore.repositories.GameRepository;
import com.gamestore.services.interfaces.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GameServiceImpl implements GameService {

    private final GameRepository gameRepository;

    @Autowired
    public GameServiceImpl(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    @Override
    public List<GameListModel> getAllGames() {

        List<Game> games = gameRepository.findAll();
        List<GameListModel> gamesListView = new ArrayList<>();

        // TODO: do i need a binding model?
        GameListModel gameModel = null;

        for (Game game : games) {

            gameModel = new GameListModel();
            gameModel.setId(game.getId());
            gameModel.setDate(game.getDate());
            gameModel.setDescription(game.getDescription());
            gameModel.setPrice(game.getPrice());
            gameModel.setSize(game.getSize());
            gameModel.setThumbnail(game.getThumbnail());
            gameModel.setTitle(game.getTitle());

            gamesListView.add(gameModel);
        }

        return gamesListView;
    }

    @Override
    public GameModel getGameById(Long gameId) {

        Game game = gameRepository.findOne(gameId);
        GameModel gameModel = new GameModel();

        gameModel.setId(game.getId());
        gameModel.setDate(game.getDate());
        gameModel.setDescription(game.getDescription());
        gameModel.setPrice(game.getPrice());
        gameModel.setSize(game.getSize());
        gameModel.setThumbnail(game.getThumbnail());
        gameModel.setTitle(game.getTitle());
        gameModel.setVideo(game.getVideo());

        return gameModel;
    }
}
