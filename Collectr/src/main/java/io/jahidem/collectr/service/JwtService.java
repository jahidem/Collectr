package io.jahidem.collectr.service;

import io.jahidem.collectr.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    private static final String SECRET_KEY = "2EBA2C77612668766A103AD25DB798A412F3BD069CE2BC0359601152A05510A2D3F64B638533DFC639BABC026FA1E703CFA35ABED79EB9F4358C5226A6FD5B1887C36D950B8A5D04821C4BD866C9E31A015E0F47AEF93C4F0BA21525A4364B4697719B000E3131FFEFFE47941C519853006C24A096341E5C541EAADB851BCFAB";

    public String extractEmail(String jwtToken) {
        return extractClaim(jwtToken, Claims::getSubject);
    }

    public <T> T extractClaim(String jwtToken, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(jwtToken);
        return claimsResolver.apply(claims);
    }
    public  String generateToken(User userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }
    public String generateToken(
            Map<String, Object> claims,
            User userDetails) {
        claims.put("id", userDetails.getId());
        claims.put("firstname", userDetails.getFirstname());
        claims.put("lastname", userDetails.getLastname());
        claims.put("email", userDetails.getEmail());
        claims.put("role", userDetails.getRole());
    return  Jwts
            .builder()
            .setClaims(claims)
            .setSubject(userDetails.getUsername())
            .setIssuedAt(new Date(System.currentTimeMillis()))
            .setExpiration(new Date(System.currentTimeMillis() + 1000  * 60 * 60 * 24 * 50 ))
            .signWith(getSigningKey(), SignatureAlgorithm.HS256)
            .compact();
    }
    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public boolean isTokenValid(String token, UserDetails userDetails){
        final String username = extractEmail(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }


    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
}


