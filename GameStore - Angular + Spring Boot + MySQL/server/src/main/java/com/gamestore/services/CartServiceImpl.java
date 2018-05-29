package com.gamestore.services;

import com.gamestore.entities.Cart;
import com.gamestore.entities.Game;
import com.gamestore.models.Game.view.GameListModel;
import com.gamestore.repositories.CartRepository;
import com.gamestore.services.interfaces.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;

    @Autowired
    public CartServiceImpl(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    @Override
    public List<GameListModel> getCartForUser(Long userId) {

        Cart cart = cartRepository.getCartByUserId(userId);
        List<GameListModel> userGamesModels = new ArrayList<>();
        Set<Game> userGames = cart.getGames();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

        GameListModel currGameModel = null;

        for (Game userGame : userGames) {

            // TODO: model mapper
            currGameModel = new GameListModel();

            currGameModel.setId(userGame.getId());
            currGameModel.setTitle(userGame.getTitle());
            currGameModel.setThumbnail(userGame.getThumbnail());
            currGameModel.setSize(userGame.getSize());
            currGameModel.setPrice(userGame.getPrice());
            currGameModel.setDescription(userGame.getDescription());
            currGameModel.setDate(sdf.format(userGame.getDate().getTime()));

            userGamesModels.add(currGameModel);
        }

        return userGamesModels;
    }
}
