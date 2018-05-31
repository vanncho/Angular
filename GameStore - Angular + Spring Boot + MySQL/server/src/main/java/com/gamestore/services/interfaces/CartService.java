package com.gamestore.services.interfaces;

import com.gamestore.models.Card.AddCardModel;
import com.gamestore.models.Game.view.GameListModel;

import java.util.List;

public interface CartService {

    boolean addToUserCart(AddCardModel cardModel);

    List<GameListModel> removeGameFromCart(AddCardModel cardModel);

    List<GameListModel> getCartForUser(Long userId);

    void makeOrder(Long userId, List<Long> gamesInCart);
}
