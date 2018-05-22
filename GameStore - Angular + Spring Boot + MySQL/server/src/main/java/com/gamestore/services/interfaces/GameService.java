package com.gamestore.services.interfaces;

import com.gamestore.models.Game.view.GameListModel;
import com.gamestore.models.Game.view.GameModel;

import java.util.List;

public interface GameService {

    List<GameListModel> getAllGames();

    GameModel getGameById(Long gameId);
}
