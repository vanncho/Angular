package com.gamestore.services;

import com.gamestore.entities.Game;
import com.gamestore.models.Game.binding.AddEditGameModel;
import com.gamestore.models.Game.view.GameListModel;
import com.gamestore.models.Game.view.GameModel;
import com.gamestore.repositories.GameRepository;
import com.gamestore.services.interfaces.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

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
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

        // TODO: do i need a binding model?
        GameListModel gameModel = null;

        for (Game game : games) {

            gameModel = new GameListModel();
            gameModel.setId(game.getId());
            gameModel.setDate(sdf.format(game.getDate().getTime()));
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
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

        gameModel.setId(game.getId());
        gameModel.setDate(sdf.format(game.getDate().getTime()));
        gameModel.setDescription(game.getDescription());
        gameModel.setPrice(game.getPrice());
        gameModel.setSize(game.getSize());
        gameModel.setThumbnail(game.getThumbnail());
        gameModel.setTitle(game.getTitle());
        gameModel.setVideo(game.getVideo());

        return gameModel;
    }

    @Override
    public boolean addGame(AddEditGameModel gameModel) {

        Game game = new Game(); // TODO: model mapper

        game.setDescription(gameModel.getDescription());
        game.setPrice(gameModel.getPrice());
        game.setSize(gameModel.getSize());
        game.setThumbnail(gameModel.getThumbnail());
        game.setTitle(gameModel.getTitle());
        game.setVideo(gameModel.getVideo());

        GregorianCalendar date = convertStringToCalendarDate(gameModel.getDate());
        game.setDate(date);

        return gameRepository.save(game) != null;
    }

    @Override
    public boolean deleteGameById(Long gameId) {

        if (gameId != null) {

            gameRepository.delete(gameId);
            return true;

        } else {
            return false;
        }

    }

    @Override
    public boolean editGameById(AddEditGameModel editGameModel, Long gameId) {

        Game game = gameRepository.findOne(gameId);

        game.setTitle(editGameModel.getTitle());
        game.setDescription(editGameModel.getDescription());
        game.setPrice(editGameModel.getPrice());
        game.setSize(editGameModel.getSize());
        game.setThumbnail(editGameModel.getThumbnail());
        game.setTitle(editGameModel.getVideo());

        GregorianCalendar date = convertStringToCalendarDate(editGameModel.getDate());
        game.setDate(date);

        return gameRepository.save(game) != null;
    }

    private GregorianCalendar convertStringToCalendarDate(String dateAsString) {

        DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        GregorianCalendar cal = new GregorianCalendar();
        Date date = null;

        try {
            date = df.parse(dateAsString);
            cal.setTime(date);

        } catch (ParseException e) {
            System.err.println("Parse exception in Convert String To Calendar Date!");
        }

        return cal;
    }
}
