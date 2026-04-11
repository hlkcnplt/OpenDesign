package ai.oux.core.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "screens")
public class Screen {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "project_id", nullable = false)
    private UUID projectId;

    @Column(name = "version_tag")
    private String versionTag;

    @Column(name = "image_url", nullable = false)
    private String imageUrl;

    @Column(name = "canvas_x")
    private double canvasX;

    @Column(name = "canvas_y")
    private double canvasY;

    @Column(name = "canvas_scale")
    private double canvasScale = 1.0;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

    public UUID getId() { return id; }
    public UUID getProjectId() { return projectId; }
    public void setProjectId(UUID projectId) { this.projectId = projectId; }
    public String getVersionTag() { return versionTag; }
    public void setVersionTag(String versionTag) { this.versionTag = versionTag; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public double getCanvasX() { return canvasX; }
    public void setCanvasX(double canvasX) { this.canvasX = canvasX; }
    public double getCanvasY() { return canvasY; }
    public void setCanvasY(double canvasY) { this.canvasY = canvasY; }
    public double getCanvasScale() { return canvasScale; }
    public void setCanvasScale(double canvasScale) { this.canvasScale = canvasScale; }
    public Instant getCreatedAt() { return createdAt; }
}
