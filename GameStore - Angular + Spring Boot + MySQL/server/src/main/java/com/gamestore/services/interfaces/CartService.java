package com.gamestore.services.interfaces;

import com.gamestore.models.Game.view.GameListModel;

import java.util.List;

public interface CartService {

    List<GameListModel> getCartForUser(Long userId);
}
