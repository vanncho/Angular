package com.gamestore.services.interfaces;

import com.gamestore.models.Game.binding.AddEditGameModel;
import com.gamestore.models.Game.view.GameListModel;
import com.gamestore.models.Game.view.GameModel;

import java.util.List;

public interface GameService {

    List<GameListModel> getAllGames();

    List<GameListModel> getAllGamesForUser(Long userId);

    GameModel getGameById(Long gameId);

    boolean addGame(AddEditGameModel gameModel);

    boolean deleteGameById(Long gameId);

    boolean editGameById(AddEditGameModel editGameModel, Long gameId);
}
