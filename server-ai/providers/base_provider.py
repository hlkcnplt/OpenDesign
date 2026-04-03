from abc import ABC, abstractmethod
from typing import Dict, Any

class BaseAIProvider(ABC):
    @abstractmethod
    async def analyze_image(self, image_url: str, context: str) -> Dict[str, Any]:
        """
        Analyze an image and return UX/UI heuristic annotations.
        """
        pass
