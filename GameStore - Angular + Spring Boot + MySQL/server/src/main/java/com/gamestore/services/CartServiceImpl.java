package com.gamestore.services;

import com.gamestore.entities.Cart;
import com.gamestore.entities.Game;
import com.gamestore.entities.User;
import com.gamestore.models.Card.AddCardModel;
import com.gamestore.models.Game.view.GameListModel;
import com.gamestore.repositories.CartRepository;
import com.gamestore.repositories.GameRepository;
import com.gamestore.repositories.UserRepository;
import com.gamestore.services.interfaces.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final GameRepository gameRepository;
    private final UserRepository userRepository;

    @Autowired
    public CartServiceImpl(CartRepository cartRepository, GameRepository gameRepository, UserRepository userRepository) {
        this.cartRepository = cartRepository;
        this.gameRepository = gameRepository;
        this.userRepository = userRepository;
    }

    @Override
    public boolean addToUserCart(AddCardModel cardModel) {

        boolean isAdded = false;
        Long userId = cardModel.getUserId();

        Long gameId = cardModel.getGameId();
        Game game = gameRepository.findOne(gameId);

        Cart cart = cartRepository.getCartByUserId(userId);

        Set<Game> gamesInCart = cart.getGames();

        if (!gamesInCart.contains(game)) {

            cart.getGames().add(game);

            cartRepository.save(cart);

            isAdded = true;
        }

        return isAdded;
    }

    @Override
    public List<GameListModel> removeGameFromCart(AddCardModel cardModel) {

        Long userId = cardModel.getUserId();

        Long gameId = cardModel.getGameId();
        Game game = gameRepository.findOne(gameId);

        Cart cart = cartRepository.getCartByUserId(userId);
        cart.getGames().remove(game);

        Cart newCartState = cartRepository.save(cart);

        Set<Game> userGames = newCartState.getGames();
        List<GameListModel> userGamesModels = GameServiceImpl.convertSetOfGameToListOfGameModels(userGames);

        return userGamesModels;
    }

    @Override
    public List<GameListModel> getCartForUser(Long userId) {

        Cart cart = cartRepository.getCartByUserId(userId);

        Set<Game> userGames = cart.getGames();
        List<GameListModel> userGamesModels = GameServiceImpl.convertSetOfGameToListOfGameModels(userGames);

        return userGamesModels;
    }

    @Override
    public void makeOrder(Long userId, List<Long> gamesInCart) {

        User user = userRepository.findOne(userId);
        Set<Game> userGames = user.getGames();

        for (Long gameId : gamesInCart) {

            Game game = gameRepository.findOne(gameId);
            userGames.add(game);
        }

        userRepository.save(user);
        cartRepository.emptyCardForUser(userId);
    }

}
